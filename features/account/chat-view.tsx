"use client";

import { useEffect, useId, useRef, useState, type ActionDispatch, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { chipClassName } from "@/components/ui/chip";
import { Textarea } from "@/components/ui/input";
import { SalonPhoto } from "@/features/salons/salon-photo";
import { cn } from "@/lib/utils";
import type { AccountBooking, ChatMessage } from "./account.types";
import { sendMessage, type AccountAction } from "./account-state";
import { describeBookingDate, tehranSlot } from "./booking-time";
import { summarizeBooking } from "./booking-summary";
import { ViewHeader } from "./view-header";

const quickReplies = ["کمی دیرتر می‌رسم", "امکان تغییر ساعت هست؟", "آدرس دقیق را می‌فرستید؟", "ممنون، می‌بینمتان"];

type ChatViewProps = {
  booking: AccountBooking;
  messages: ChatMessage[];
  now: Date;
  dispatch: ActionDispatch<[AccountAction]>;
  onBack: () => void;
};

function dayLabel(dateKey: string, now: Date) {
  if (dateKey === tehranSlot(now).date) {
    return "امروز";
  }
  if (dateKey === tehranSlot(new Date(now.getTime() - 86_400_000)).date) {
    return "دیروز";
  }
  return describeBookingDate(dateKey);
}

/** Messages grouped by their Tehran day, oldest first. */
function groupByDay(messages: ChatMessage[]) {
  const groups: { date: string; messages: ChatMessage[] }[] = [];
  for (const message of messages) {
    const date = tehranSlot(new Date(message.sentAt)).date;
    const last = groups[groups.length - 1];
    if (last?.date === date) {
      last.messages.push(message);
    } else {
      groups.push({ date, messages: [message] });
    }
  }
  return groups;
}

export function ChatView({ booking, messages, now, dispatch, onBack }: ChatViewProps) {
  const id = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState("");
  const { salon, plate } = summarizeBooking(booking);
  const thread = messages.filter((message) => message.bookingId === booking.id);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  // Keeps the newest message in view when the chat opens and after each one is sent.
  useEffect(() => {
    const log = logRef.current;
    if (log) {
      log.scrollTop = log.scrollHeight;
    }
  }, [thread.length]);

  function send(text: string) {
    const value = text.trim();
    if (!value) {
      return;
    }
    dispatch(sendMessage(booking.id, value));
    setDraft("");
  }

  // With a keyboard, Enter sends and Shift+Enter adds a line. Touch keyboards keep Enter for new lines.
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing && window.matchMedia("(pointer: fine)").matches) {
      event.preventDefault();
      send(draft);
    }
  }

  return (
    <div className="flex h-dvh flex-col bg-background lg:mx-auto lg:my-6 lg:h-[calc(100dvh-3rem)] lg:max-w-2xl lg:overflow-hidden lg:rounded-xl lg:border lg:border-border lg:shadow-card">
      <ViewHeader title={salon.name} headingRef={headingRef} onBack={onBack}>
        <p className="truncate text-xs text-text-muted">
          درباره نوبت {describeBookingDate(booking.date)}، ساعت <span dir="ltr">{booking.time}</span>
        </p>
      </ViewHeader>
      <p className="shrink-0 bg-surface px-4 py-2 text-center text-xs/relaxed text-text-secondary">
        نمایشی: تا اتصال به سرور، پیام‌ها فقط در همین مرورگر می‌مانند و برای سالن ارسال نمی‌شوند.
      </p>

      <div ref={logRef} role="log" aria-label="پیام‌ها" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        {thread.length === 0 && (
          <p className="py-10 text-center text-sm text-text-muted">هنوز پیامی نیست. سؤالتان را درباره این نوبت بنویسید.</p>
        )}
        {groupByDay(thread).map((group) => (
          <section key={group.date} aria-label={dayLabel(group.date, now)} className="flex flex-col gap-2 pb-4">
            <p aria-hidden="true" className="self-center rounded-full bg-surface px-3 py-1 text-xs text-text-muted">
              {dayLabel(group.date, now)}
            </p>
            <ol className="flex flex-col gap-2">
              {group.messages.map((message) => {
                const mine = message.from === "customer";
                return (
                  <li key={message.id} className={cn("flex max-w-[85%] items-end gap-2", mine ? "self-end" : "self-start")}>
                    {!mine && <SalonPhoto plate={plate} className="size-7 shrink-0 rounded-full" />}
                    <div
                      className={cn(
                        "rounded-2xl px-3.5 py-2 text-sm/relaxed",
                        mine ? "rounded-ee-md bg-accent text-on-accent" : "rounded-es-md bg-surface text-ink",
                      )}
                    >
                      <span className="sr-only">{mine ? "شما:" : `${salon.name}:`}</span>
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <p className={cn("mt-0.5 text-end text-xs", mine ? "text-on-accent/75" : "text-text-muted")}>
                        <span dir="ltr">{tehranSlot(new Date(message.sentAt)).time}</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>

      <div className="shrink-0 border-t border-border bg-background px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div aria-label="پاسخ‌های آماده" role="group" className="scrollbar-none -mx-3 flex gap-2 overflow-x-auto px-3 pb-2">
          {quickReplies.map((reply) => (
            <button key={reply} type="button" onClick={() => send(reply)} className={chipClassName(false, "focus-ring-2 shrink-0")}>
              {reply}
            </button>
          ))}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            send(draft);
          }}
          className="flex items-end gap-2"
        >
          <label htmlFor={`${id}-message`} className="sr-only">
            پیام به {salon.name}
          </label>
          <Textarea
            id={`${id}-message`}
            rows={1}
            maxLength={500}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="پیام خود را بنویسید…"
            className="max-h-32 min-h-12 flex-1 resize-none py-3"
          />
          <Button type="submit" aria-disabled={!draft.trim()} className="h-12 shrink-0 px-5 text-base">
            ارسال
          </Button>
        </form>
      </div>
    </div>
  );
}
