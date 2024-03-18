import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <div className="flex h-screen items-center justify-center">
    <SignIn appearance={{
      elements: {
        card: "bg-background border border-input text-primary",
        headerTitle: "text-primary",
        headerSubtitle: "text-primary",
        socialButtonsBlockButton: "text-primary bg-primary-foreground border border-input hover:bg-primary hover:text-primary-foreground",
        dividerText: "text-primary",
        formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
        formFieldLabel: "text-primary",
        formFieldInput: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        footerActionText: "text-primary",
      }
    }} />
  </div>
}
