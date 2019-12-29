export function HookWrapper<HookProps extends any[] | object>(props: {
  hook: HookProps
}) {
  return (
    <></>
  );
};
export function TestHookWrapper<HookFn extends (...args: any[]) => any[] | object>(hookFn: HookFn) {
  return (...hookArgs: Parameters<HookFn>) => () => {
    const hookStates = hookFn(...hookArgs);
    return (
      <HookWrapper hook={hookStates} />
    );
  };
}