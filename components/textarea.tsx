interface TextAreaProps {
  label?: string;
  name?: string;
  [key: string]: any;
}
export default function TextArea({ label, name, ...rest }: TextAreaProps) {
  return (
    <>
      {label ? (
        <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-500">
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        {...rest}
        className="bordr-gray-300 mt-1 w-full rounded-md shadow-sm focus:border-orange-500  focus:ring-orange-500"
      />
    </>
  );
}
