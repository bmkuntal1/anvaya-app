import React from "react"
import { Link } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-12 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2 ms-2">
                        <span className="font-light text-xl"><span className="font-semibold">Anvaya</span> Billing</span>
                    </Link>
                    <nav>
                        <Link
                            to="/register"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary me-2 md:me-4">
                            Register
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center px-4 py-8">
                {children}
            </main>
            <Toaster />
        </div>
    )
}
