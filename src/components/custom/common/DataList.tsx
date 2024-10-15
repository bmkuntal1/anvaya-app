import React from 'react';

interface DataListProps {
    children: React.ReactNode;
    variant?: 'horizontal' | 'vertical';
    columns?: number;
    labelWidth?: string;
    className?: string;
}

const DataList = ({ children, columns = 1, labelWidth = '80px', variant = 'horizontal', className }: DataListProps) => {
    const columnSet = Array.from({ length: columns }, () => `${labelWidth}_auto`).join('_');

    const horizontal = variant === 'horizontal' ? `lg:grid-cols-[${columnSet}]` : '';

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { variant } as { variant?: 'horizontal' | 'vertical' });
        }
        return child;
    });

    return (
        <dl className={`grid grid-cols-[auto] ${horizontal} ${className}`}>
            {childrenWithProps}
        </dl>
    )
}

DataList.Label = ({ children, variant, className }: { children: React.ReactNode, variant?: 'horizontal' | 'vertical', className?: string }) => {
    if (variant === 'horizontal') {
        return <dt className={`pr-2 lg:py-2 ${className}`}>{children}</dt>;
    }
    return <dt className={`pr-2 ${className}`}>{children}</dt>;
}

DataList.Value = ({ children, variant, className }: { children: React.ReactNode, variant?: 'horizontal' | 'vertical', className?: string }) => {
    if (variant === 'horizontal') {
        return <dd className={`font-semibold pb-3 lg:pb-0 lg:py-2 ${className}`}>{children}</dd>;
    }
    return <dd className={`font-semibold pb-3 ${className}`}>{children}</dd>;
}

export { DataList };
