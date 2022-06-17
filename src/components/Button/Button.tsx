import cls from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
};

const variantToClass = {
  primary:
    'flex text-gray-50 bg-indigo-600 px-2 py-1.5 shadow-glow rounded-md hover:shadow-none hover:bg-indigo-700 ease-in-out duration-300',
  secondary: 'text-indigo-500',
};

const Button = ({ children, variant = 'primary' }: ButtonProps) => {
  return <button className={cls(variantToClass[variant])}>{children}</button>;
};

export { Button };
