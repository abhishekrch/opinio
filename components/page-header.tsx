import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from 'next/image'
import { Button } from "./ui/button";
import HeaderMenu from "./header-menu";
export const PageHeader = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-30 w-full transition-all">
      <div className="w-full max-w-screen-xl px-2.5 
      lg:px-20 relative mx-auto border-b bg-gray-100">
        <div className="flex h-14 items-center justify-between">
          <Image src="/opinio.svg" alt="Logo" width={120} height={200} />
          <div>
            <SignedOut>
              <SignInButton >
                <Button className="bg-black">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-black ml-2">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <HeaderMenu />
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};
