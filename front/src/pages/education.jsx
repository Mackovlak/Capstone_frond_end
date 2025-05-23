import { AppSidebar } from '@/components/app-sidebar'
import { Button } from '@/components/ui/button'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { useNavigate } from 'react-router'
export const Education = () => {
    const navigate = useNavigate();
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex  items-center justify-between px-4 gap-2 py-4 bg-cold-1">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                        </div>
                        <div className="space-x-4">
                            <Button
                                variant={'ghost'}
                                className="text-white text-lg"
                                onClick={() => navigate('/')}
                            >
                                Home
                            </Button>
                            <Button
                                variant={'ghost'}
                                className="text-white text-lg"
                                onClick={() => navigate('/about')}
                            >
                                About
                            </Button>
                            <Button
                                variant={'ghost'}
                                className="text-white text-lg"
                                onClick={() => navigate('/education')}
                            >
                                Education
                            </Button>
                        </div>

                        <div className="space-x-4">
                            <Button
                                variant={'ghost'}
                                className="text-white text-lg"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                            <Button
                                variant={'ghost'}
                                className="text-white text-lg"
                                onClick={() => navigate('/register')}
                            >
                                Register
                            </Button>
                        </div>
                    </header>
                <section className='relative h-screen bg-cold-4/0'>
                    
                </section>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
