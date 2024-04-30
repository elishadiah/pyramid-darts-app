const CustomTextAreaComponent = ({
  name,
  value,
  placeholder,
  handleTextArea,
}) => {
  return (
    <div>
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleTextArea}
        maxLength={2000}
        rows={10}
        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 dark:bg-white/5 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-md sm:leading-6 focus-border-none focus-outline-none"
      />
      <p className="text-right text-sm">
        {value?.length ? value?.length : 0} / 2000
      </p>
    </div>
  );
};

export default CustomTextAreaComponent;
