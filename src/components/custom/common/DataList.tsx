import React from 'react';

interface DataListProps {
    children: React.ReactNode;
    variant?: 'horizontal' | 'vertical';
    className?: string;
}

// set columns based on variant manually eg md:grid-cols-[80px_auto] or md:grid-cols-[80px_auto_80px_auto]
const DataList = ({ children, variant = 'horizontal', className }: DataListProps) => {
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { variant } as { variant?: 'horizontal' | 'vertical' });
        }
        return child;
    });

    return (
        <dl className={`grid grid-cols-[auto] ${className}`}>
            {childrenWithProps}
        </dl>
    )
}

DataList.Label = ({ children, variant, className }: { children: React.ReactNode, variant?: 'horizontal' | 'vertical', className?: string }) => {
    if (variant === 'horizontal') {
        return <dt className={`pr-2 md:py-2 ${className}`}>{children}</dt>;
    }
    return <dt className={`pr-2 ${className}`}>{children}</dt>;
}

DataList.Value = ({ children, variant, className }: { children: React.ReactNode, variant?: 'horizontal' | 'vertical', className?: string }) => {
    if (variant === 'horizontal') {
        return <dd className={`font-semibold pb-3 md:pb-0 md:py-2 ${className}`}>{children}</dd>;
    }
    return <dd className={`font-semibold pb-3 ${className}`}>{children}</dd>;
}

export { DataList };
