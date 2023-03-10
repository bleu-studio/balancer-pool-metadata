// your-select.jsx
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import classNames from "classnames";
import { ComponentPropsWithRef, forwardRef } from "react";

export const Select = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithRef<typeof SelectPrimitive.Root>
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger
        className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-blue3 px-[15px] text-[13px] leading-none text-white shadow-[0_2px_10px] shadow-blue1/10 outline-none hover:bg-blue3 focus:shadow-[0_0_0_2px] focus:shadow-blue1 disabled:bg-blackA9 data-[placeholder]:text-blue9"
        ref={forwardedRef}
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon className="text-white">
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="overflow-hidden rounded-md bg-blue3 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <SelectPrimitive.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-blue3 text-white">
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-[5px]">
            {children}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton
            className={classNames(
              "text-white flex h-[25px] cursor-default items-center justify-center bg-blue3"
            )}
          >
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

export const SelectItem = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof SelectPrimitive.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item
      className={classNames(
        "text-white data-[disabled]:text-blue3 data-[highlighted]:bg-blue9 data-[highlighted]:text-blue1 relative flex h-[25px] select-none items-center rounded-[3px] pr-[35px] pl-[25px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});
