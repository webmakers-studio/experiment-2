"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Users, ChevronDown } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";

interface ReserveSectionProps {
  price: number;
  maxGuests: number;
}

export default function ReserveSection({
  price,
  maxGuests,
}: ReserveSectionProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [guests, setGuests] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  const calculateTotal = () => {
    const nights =
      dateRange?.from && dateRange?.to
        ? differenceInDays(dateRange.to, dateRange.from)
        : 5;
    const subtotal = price * nights;
    const serviceFee = Math.round(subtotal * 0.14);
    const taxes = Math.round(subtotal * 0.12);
    return {
      nights,
      subtotal,
      serviceFee,
      taxes,
      total: subtotal + serviceFee + taxes,
    };
  };

  const { nights, subtotal, serviceFee, taxes, total } = calculateTotal();

  return (
    <div className="bg-white z-40 mb-6">
      <div className="border border-gray-200 rounded-2xl shadow-lg bg-white">
        {/* Header - Always Visible */}
        <div
          className="p-6 cursor-pointer hover:bg-gray-50/50 transition-all duration-200 rounded-2xl"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-gray-900">${price}</span>
              <span className="text-gray-600 font-medium">per night</span>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Quick Info when collapsed */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center space-x-4 text-sm text-gray-600"
            >
              <span className="flex items-center space-x-1">
                <CalendarIcon className="w-4 h-4" />
                <span>
                  {dateRange?.from && dateRange?.to
                    ? `${format(dateRange.from, "MMM dd")} - ${format(
                        dateRange.to,
                        "MMM dd"
                      )}`
                    : "Select dates"}
                </span>
              </span>
              <span className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>
                  {guests} guest{guests > 1 ? "s" : ""}
                </span>
              </span>
            </motion.div>
          )}
        </div>

        {/* Collapsible Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden border-t border-gray-100"
            >
              <div className="px-6 pt-6 pb-6">
                <div className="space-y-6 mb-8">
                  {/* Date Selection */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-900">
                      Select dates
                    </label>
                    <Popover
                      open={isCalendarOpen}
                      onOpenChange={setIsCalendarOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal h-14 px-4 border-2 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        >
                          <CalendarIcon className="mr-3 h-5 w-5 text-gray-500" />
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                <div className="flex flex-col">
                                  <span className="text-gray-900 font-medium">
                                    {format(dateRange.from, "MMM dd")} -{" "}
                                    {format(dateRange.to, "MMM dd, yyyy")}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {differenceInDays(
                                      dateRange.to,
                                      dateRange.from
                                    )}{" "}
                                    night
                                    {differenceInDays(
                                      dateRange.to,
                                      dateRange.from
                                    ) > 1
                                      ? "s"
                                      : ""}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <span className="text-gray-900">
                                {format(dateRange.from, "MMM dd, yyyy")}
                              </span>
                            )
                          ) : (
                            <span className="text-gray-500">
                              Check-in • Check-out
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange?.from}
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={2}
                          disabled={(date) => date < new Date()}
                          className="rounded-md border-0"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Guest Selection */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-900">
                      Guests
                    </label>
                    <Popover open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between text-left font-normal h-14 px-4 border-2 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        >
                          <div className="flex items-center">
                            <Users className="mr-3 h-5 w-5 text-gray-500" />
                            <span className="text-gray-900 font-medium">
                              {guests} guest{guests > 1 ? "s" : ""}
                            </span>
                          </div>
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" align="start">
                        <div className="space-y-4 p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Guests
                              </h4>
                              <p className="text-sm text-gray-500">
                                Ages 13 or above
                              </p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() =>
                                  setGuests(Math.max(1, guests - 1))
                                }
                                disabled={guests <= 1}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {guests}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() =>
                                  setGuests(Math.min(maxGuests, guests + 1))
                                }
                                disabled={guests >= maxGuests}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mb-6"
                >
                  Reserve Now
                </motion.button>

                <p className="text-center text-gray-600 text-sm mb-6 font-medium">
                  You won&apos;t be charged yet
                </p>

                <div className="space-y-4 bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      ${price} × {nights} night{nights > 1 ? "s" : ""}
                    </span>
                    <span className="text-gray-900 font-semibold">
                      ${subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      Service fee
                    </span>
                    <span className="text-gray-900 font-semibold">
                      ${serviceFee}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Taxes</span>
                    <span className="text-gray-900 font-semibold">
                      ${taxes}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ${total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
