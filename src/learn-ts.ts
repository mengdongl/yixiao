export type Action =
  | {
      type: "INIT";
    }
  | {
      type: "SYNC";
    }
  | {
      type: "LOG_IN";
      emailAddress: string;
    }
  | {
      type: "LOG_IN_SUCCESS";
      accessToken: string;
    };

type ActionType = Action["type"];

type ExcluedKey<T, K> = {
  [P in Exclude<keyof T, K>]: T[P];
};
type ExtractActionParameters<A, T> = A extends { type: T }
  ? {} extends ExcluedKey<A, "type"> ? never : ExcluedKey<A, "type">
  : never;

type ExtractSimpleAction<A> = A extends any ? {} extends ExcluedKey<A, "type"> ? A : never : never

type T1 = Parameters<(s: string,a:number) => void>;

let a: [s:string,a:number] = ['d',12]
type SimpleAction = ExtractSimpleAction<Action>['type']

declare function dispatch(action: Action): void;

declare function dispatch(action: SimpleAction): void;

declare function dispatch<T extends ActionType>(
  type: T,
  args: ExtractActionParameters<Action, T>
): void;
// All clear! :)

dispatch("LOG_IN_SUCCESS", {
  accessToken: "038fh239h923908h",
});

dispatch("INIT");


dispatch("LOG_IN_SUCCESS",{accessToken:'d'});

// Type Error! :)

// dispatch("BAD_TYPE");
