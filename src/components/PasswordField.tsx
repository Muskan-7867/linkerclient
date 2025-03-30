import React, { useState } from 'react';
import EyeIcon from "../../public/svg/eye-icon.svg"
import EyeSlashIcon from '../../public/svg/eye-slash-icon.svg';

interface PasswordFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  value,
  onChange,
  label,
  required = true,
  id,
  name,
  className = ''
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          placeholder="••••••••"
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition pr-12"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <img src={EyeSlashIcon} alt="Hide password" className="h-5 w-5 text-gray-500" />
          ) : (
            <img src={EyeIcon} alt="Show password" className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;