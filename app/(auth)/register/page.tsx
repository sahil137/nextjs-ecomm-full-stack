import RegistrationForm from "@/components/forms/registration-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <main className="flex justify-center items-center h-[80vh]">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-center">Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <RegistrationForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default RegisterPage;
