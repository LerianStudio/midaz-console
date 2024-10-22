import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { HelpCircle } from 'lucide-react'
import { Control, FieldValues, Path } from 'react-hook-form'

interface FormSelectWithTooltipProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  tooltipText: string
  placeholder: string
  options: Array<{ value: string; label: string }>
}

export const FormSelectWithTooltip = <T extends FieldValues>({
  control,
  name,
  label,
  tooltipText,
  placeholder,
  options
}: FormSelectWithTooltipProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex justify-between">
            {label}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="ml-2 h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>{tooltipText}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
