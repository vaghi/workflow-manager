import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PlusIcon } from '../../assets/PlusIcon';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = React.memo(({ isOpen, onClose, title, children }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            setIsMounted(true);
            // Slight delay to allow render with opacity-0 before switching to opacity-100
            requestAnimationFrame(() => {
                setIsVisible(true);
            });
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            setIsVisible(false);
            // Wait for animation to finish before unmounting
            const timer = setTimeout(() => setIsMounted(false), 300);
            return () => {
                clearTimeout(timer);
                document.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = 'unset';
            };
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen && !isMounted) return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={onClose}
        >
            <div
                className={`w-[500px] bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 ease-in-out ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        {/* Reusing PlusIcon rotated 45deg as Close Icon is a classic hack if no X icon */}
                        <div className="transform rotate-45">
                            <PlusIcon className="w-5 h-5" />
                        </div>
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
});
