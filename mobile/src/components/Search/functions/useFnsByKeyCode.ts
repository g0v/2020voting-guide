import { KEYCODE } from "../../../config";
import { Callback } from "../types";
import { calNewIndex } from "./plusOrMinusIndex";
import { useState, useEffect, useCallback } from "react";

type ConfirmOrEscape = typeof KEYCODE.ENTER | typeof KEYCODE.ESCAPE
type PlusOrMinusKeyCode = typeof KEYCODE.ARROW_UP | typeof KEYCODE.ARROW_DOWN

export class handleFnsByKeyCode {
  static confirmOrEscape = (confirmFn: Callback, escapeFn: Callback) => {
    return (keyCode: ConfirmOrEscape) => {
      if(keyCode === KEYCODE.ENTER) {
        confirmFn();
      }
      else if(keyCode === KEYCODE.ESCAPE) {
        escapeFn();
      }
    };
  };

  static plusOrMinusIndex = (
    keyCode: PlusOrMinusKeyCode
  ) => {
    return keyCode === KEYCODE.ARROW_UP ? calNewIndex('-') : calNewIndex('+')
  }
}

export const useFnsByKeyCode = ({
  lastIndex, confirmFn, escapeFn
}: {
  lastIndex: number,
  confirmFn: Callback,
  escapeFn: Callback,
}) => {
  const [index, setIndex] = useState(0)
  const [confirmFnNow, setConfirmFn] = useState(() => confirmFn)
  const handleFnsByKeyCodeEvent = useCallback((e: KeyboardEvent) => {
    const { keyCode } = e
    switch (keyCode) {
      case KEYCODE.ENTER:
      case KEYCODE.ESCAPE: {
        console.log('key up', confirmFn, confirmFnNow)
        handleFnsByKeyCode.confirmOrEscape(confirmFnNow, escapeFn)(keyCode)
        break;
      }
      case KEYCODE.ARROW_UP:
      case KEYCODE.ARROW_DOWN: {
        const calculatedIndex = handleFnsByKeyCode.plusOrMinusIndex(keyCode)({
          lastIndex,
          indexNow: index
        })
        setIndex(calculatedIndex)
        break;
      } 
      default:
        break;
    }
  }, [index, lastIndex, confirmFnNow])
  useEffect(() => {
    window.addEventListener('keyup', handleFnsByKeyCodeEvent);
    return () => {
      window.removeEventListener('keyup', handleFnsByKeyCodeEvent);
    };
  }, [handleFnsByKeyCodeEvent])

  return ({
    index,
    setConfirmFn
  })
}