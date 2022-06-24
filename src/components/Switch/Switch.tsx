import { Switch } from '@headlessui/react';

type SwitchProps = {
  enabled: boolean;
};

const SwitchCheckbox = ({ enabled }: SwitchProps) => {
  return (
    <Switch
      checked={enabled}
      onChange={() => !enabled}
      className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Published</span>
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
      Published
    </Switch>
  );
};

export { SwitchCheckbox };
