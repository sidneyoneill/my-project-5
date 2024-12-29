import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/UI/form';
import { Input } from '@/components/UI/input';
import { Checkbox } from '@/components/UI/checkbox';
import { UseFormReturn } from 'react-hook-form';
import type { SignupFormData } from './signupSchema';

interface SignupFormFieldsProps {
  form: UseFormReturn<SignupFormData>;
}

export const SignupFormFields: React.FC<SignupFormFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Full Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your full name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Create a secure password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="terms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-[#FFD700] data-[state=checked]:border-[#FFD700]"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm text-white">
                I accept the{' '}
                <a href="/terms" className="text-[#FFD700] hover:underline">
                  terms and conditions
                </a>
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="marketing"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-[#FFD700] data-[state=checked]:border-[#FFD700]"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm text-white">
                I want to receive updates about products and promotions
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </>
  );
};