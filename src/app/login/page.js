"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, Store, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError("Email atau password tidak valid. Silakan coba lagi.");
      } else {
        router.replace("/dashboard/menu");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Custom CSS untuk color palette */}
      <style jsx global>{`
        :root {
          --pos-primary: #ef959d;
          --pos-foreground: #69585f;
          --pos-background: #d9dbbc;
          --pos-secondary: #b8d8ba;
          --pos-accent: #fcddbc;
        }

        .login-container {
          background: linear-gradient(
            135deg,
            #d9dbbc 0%,
            #fcddbc 50%,
            #b8d8ba 100%
          );
          position: relative;
          overflow: hidden;
        }

        .login-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23EF959D' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.3;
        }

        .glass-effect {
          background: rgba(252, 221, 188, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(239, 149, 157, 0.2);
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .floating-shape:nth-child(1) {
          width: 80px;
          height: 80px;
          background: rgba(239, 149, 157, 0.1);
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-shape:nth-child(2) {
          width: 120px;
          height: 120px;
          background: rgba(184, 216, 186, 0.1);
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }

        .floating-shape:nth-child(3) {
          width: 60px;
          height: 60px;
          background: rgba(105, 88, 95, 0.1);
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .input-focus-effect:focus {
          border-color: #ef959d;
          box-shadow: 0 0 0 3px rgba(239, 149, 157, 0.1);
        }
      `}</style>

      <div className='login-container min-h-[calc(100dvh-3.5rem-4.25rem)] flex items-center justify-center p-4 relative'>
        {/* Floating Background Elements */}
        <div className='floating-elements'>
          <div className='floating-shape'></div>
          <div className='floating-shape'></div>
          <div className='floating-shape'></div>
        </div>

        {/* Main Login Card */}
        <div className='w-full max-w-md relative z-10'>
          {/* Brand Header */}
          <div className='text-center mb-8'>
            <div className='flex justify-center mb-4'>
              <div
                className='w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg'
                style={{ backgroundColor: "#EF959D" }}
              >
                <Store className='h-8 w-8 text-white' />
              </div>
            </div>
            <h1
              className='text-3xl font-bold mb-2'
              style={{ color: "#69585F" }}
            >
              Multi-Store POS
            </h1>
            <p className='text-sm opacity-80' style={{ color: "#69585F" }}>
              Masuk ke dashboard admin Anda
            </p>
          </div>

          {/* Login Form Card */}
          <Card className='glass-effect shadow-2xl border-0'>
            <CardHeader className='text-center pb-4'>
              <Badge
                variant='outline'
                className='w-fit mx-auto mb-4 px-3 py-1'
                style={{
                  color: "#EF959D",
                  borderColor: "#EF959D",
                  backgroundColor: "rgba(239, 149, 157, 0.1)",
                }}
              >
                🔐 Admin Login
              </Badge>
              <CardTitle
                className='text-2xl font-bold'
                style={{ color: "#69585F" }}
              >
                Selamat Datang Kembali
              </CardTitle>
              <p
                className='text-sm opacity-70 mt-2'
                style={{ color: "#69585F" }}
              >
                Silakan masuk dengan akun admin Anda
              </p>
            </CardHeader>

            <CardContent className='space-y-6'>
              <form onSubmit={handleSubmit} className='space-y-5'>
                {/* Email Input */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='email'
                    className='text-sm font-medium flex items-center gap-2'
                    style={{ color: "#69585F" }}
                  >
                    <Mail className='h-4 w-4' />
                    Email Address
                  </Label>
                  <div className='relative'>
                    <Input
                      id='email'
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='admin@example.com'
                      className='input-focus-effect h-12 pl-4 pr-4 rounded-xl border-2 transition-all duration-200'
                      style={{
                        borderColor: "#B8D8BA",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='password'
                    className='text-sm font-medium flex items-center gap-2'
                    style={{ color: "#69585F" }}
                  >
                    <Lock className='h-4 w-4' />
                    Password
                  </Label>
                  <div className='relative'>
                    <Input
                      id='password'
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='••••••••'
                      className='input-focus-effect h-12 pl-4 pr-12 rounded-xl border-2 transition-all duration-200'
                      style={{
                        borderColor: "#B8D8BA",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                      }}
                      required
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff
                          className='h-4 w-4'
                          style={{ color: "#69585F" }}
                        />
                      ) : (
                        <Eye className='h-4 w-4' style={{ color: "#69585F" }} />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div
                    className='p-3 rounded-xl text-sm font-medium'
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      color: "#dc2626",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                    }}
                  >
                    ⚠️ {error}
                  </div>
                )}

                {/* Login Button */}
                <Button
                  type='submit'
                  disabled={isLoading}
                  className='w-full h-12 text-white font-semibold text-base rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg'
                  style={{ backgroundColor: "#EF959D" }}
                >
                  {isLoading ? (
                    <div className='flex items-center gap-3'>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      Memproses Login...
                    </div>
                  ) : (
                    <div className='flex items-center gap-3'>
                      <span>Masuk ke Dashboard</span>
                      <ArrowRight className='h-5 w-5' />
                    </div>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className='flex items-center gap-4 my-6'>
                <Separator
                  className='flex-1'
                  style={{ backgroundColor: "#B8D8BA" }}
                />
                <span
                  className='text-xs font-medium px-2'
                  style={{ color: "#69585F", opacity: 0.6 }}
                >
                  SECURE LOGIN
                </span>
                <Separator
                  className='flex-1'
                  style={{ backgroundColor: "#B8D8BA" }}
                />
              </div>

              {/* Security Features */}
              <div className='grid grid-cols-2 gap-4 text-center'>
                <div className='text-center'>
                  <div
                    className='w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2'
                    style={{ backgroundColor: "#B8D8BA" }}
                  >
                    <span className='text-lg'>🔒</span>
                  </div>
                  <p
                    className='text-xs font-medium'
                    style={{ color: "#69585F" }}
                  >
                    SSL Encrypted
                  </p>
                </div>
                <div className='text-center'>
                  <div
                    className='w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2'
                    style={{ backgroundColor: "#B8D8BA" }}
                  >
                    <span className='text-lg'>🛡️</span>
                  </div>
                  <p
                    className='text-xs font-medium'
                    style={{ color: "#69585F" }}
                  >
                    Data Protected
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className='text-center mt-8'>
            <p className='text-sm opacity-60' style={{ color: "#69585F" }}>
              © 2024 Multi-Store POS. Semua hak dilindungi.
            </p>
            <div className='flex justify-center gap-4 mt-3'>
              <a
                href='#'
                className='text-xs hover:opacity-80 transition-opacity'
                style={{ color: "#69585F" }}
              >
                Kebijakan Privasi
              </a>
              <span style={{ color: "#69585F", opacity: 0.4 }}>•</span>
              <a
                href='#'
                className='text-xs hover:opacity-80 transition-opacity'
                style={{ color: "#69585F" }}
              >
                Bantuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
