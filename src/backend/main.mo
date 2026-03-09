import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type ResumeFeedback = {
    id : Nat;
    resumeText : Text;
    score : Nat;
    strengths : [Text];
    improvements : [Text];
    keywords : [Text];
    timestamp : Int;
  };

  public type InterviewSession = {
    id : Nat;
    category : Text;
    question : Text;
    answer : Text;
    score : Nat;
    feedback : Text;
    timestamp : Int;
  };

  var nextResumeId : Nat = 0;
  var nextSessionId : Nat = 0;
  let resumeHistory = Map.empty<Principal, [ResumeFeedback]>();
  let interviewHistory = Map.empty<Principal, [InterviewSession]>();

  func appendEntry<T>(arr : [T], item : T) : [T] {
    let size = arr.size();
    Array.tabulate(size + 1, func(i : Nat) : T {
      if (i < size) { arr[i] } else { item }
    })
  };

  public shared ({ caller }) func submitResumeFeedback(
    resumeText : Text,
    score : Nat,
    strengths : [Text],
    improvements : [Text],
    keywords : [Text],
  ) : async Nat {
    let id = nextResumeId;
    nextResumeId += 1;
    let entry : ResumeFeedback = {
      id;
      resumeText;
      score;
      strengths;
      improvements;
      keywords;
      timestamp = Time.now();
    };
    let existing = switch (resumeHistory.get(caller)) {
      case (?arr) arr;
      case null [];
    };
    resumeHistory.add(caller, appendEntry(existing, entry));
    id
  };

  public query ({ caller }) func getResumeHistory() : async [ResumeFeedback] {
    switch (resumeHistory.get(caller)) {
      case (?arr) arr;
      case null [];
    }
  };

  public shared ({ caller }) func submitInterviewSession(
    category : Text,
    question : Text,
    answer : Text,
    score : Nat,
    feedback : Text,
  ) : async Nat {
    let id = nextSessionId;
    nextSessionId += 1;
    let entry : InterviewSession = {
      id;
      category;
      question;
      answer;
      score;
      feedback;
      timestamp = Time.now();
    };
    let existing = switch (interviewHistory.get(caller)) {
      case (?arr) arr;
      case null [];
    };
    interviewHistory.add(caller, appendEntry(existing, entry));
    id
  };

  public query ({ caller }) func getInterviewHistory() : async [InterviewSession] {
    switch (interviewHistory.get(caller)) {
      case (?arr) arr;
      case null [];
    }
  };
};
