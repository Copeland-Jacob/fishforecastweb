import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0C1F2D]">
      <SignIn
        forceRedirectUrl="/dashboard"
        signUpForceRedirectUrl="/dashboard"
        appearance={{
          baseTheme: dark,

          elements: {
            card: "border-2 border-[#162A39] shadow-2xl",
            headerTitle: "text-[#15EEED]",
            socialButtonsBlockButton:
              "bg-[#162A39] border-gray-700 hover:bg-[#1f3a4e]",
            formButtonPrimary: "bg-[#0babb7] hover:bg-[#088a93] text-white",
            footerActionLink: "text-[#15EEED] hover:text-[#0babb7]",
          },
        }}
      />
    </div>
  );
}
