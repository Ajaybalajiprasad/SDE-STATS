import React from 'react';

const Button = ({ children, onClick, variant, className, type }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 rounded-md ${className} ${
      variant === 'outline' ? 'border-2 border-gray-300' : ''
    }`}
  >
    {children}
  </button>
);

const Label = ({ children, htmlFor, className }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium ${className}`}>
    {children}
  </label>
);

const Input = ({ id, name, value, onChange, className }) => (
  <input
    id={id}
    name={name}
    type="text"
    value={value}
    onChange={onChange}
    className={`mt-1 block w-full px-3 py-2 border rounded-md ${className}`}
  />
);

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-md ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="px-4 py-2 border-b">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-lg font-bold">{children}</h2>
);

const CardContent = ({ children }) => <div className="p-4">{children}</div>;

const Avatar = ({ children, className }) => (
  <div className={`rounded-full overflow-hidden w-12 h-12 ${className}`}>
    {children}
  </div>
);

const AvatarImage = ({ src }) => (
  <img src={src} alt="avatar" className="w-full h-full object-cover" />
);

const AvatarFallback = ({ children }) => (
  <div className="flex items-center justify-center w-full h-full bg-gray-300">
    {children}
  </div>
);

const Tabs = ({ activeTab, onChange, children }) => (
  <div>
    <div className="flex border-b">
      {React.Children.map(children, (child) => (
        <button
          className={`mr-4 pb-2 ${activeTab === child.props.id ? 'border-b-2 border-primary' : ''}`}
          onClick={() => onChange(child.props.id)}
        >
          {child.props.label}
        </button>
      ))}
    </div>
    <div className="mt-4">
      {React.Children.map(children, (child) => activeTab === child.props.id && child)}
    </div>
  </div>
);

const Tab = ({ children }) => <div>{children}</div>;

export {
  Button,
  Label,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Tabs,
  Tab
};
