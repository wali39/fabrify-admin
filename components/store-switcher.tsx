"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import {
  Check,
  ChevronsUpDownIcon,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { Store } from "@prisma/client";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandList,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { StoreModal } from "./modals/store-modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { ScrollArea } from "./ui/scroll-area";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}
export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const StoreModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);

  const onStoreSelect = (store: { label: string; value: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between truncate", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4 " />
          {currentStore?.label}
          <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <ScrollArea className="h-[150px] ">
              <CommandGroup heading="Stores">
                {formattedItems.map((store) => (
                  <CommandItem
                    key={store.value}
                    onSelect={() => onStoreSelect(store)}
                  >
                    <StoreIcon className="mr-2 w-4 h-4" />
                    {store.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentStore?.value === store.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                StoreModal.onOpen();
              }}
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Store
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
