"use client";
import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import MinimalLayout from "@/components/layout/minimalLayout";
import FormRegister from "./_components/formRegister";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getLocal } from "@/lib/helpers/cookie";
import { useTranslation } from "react-i18next";
import { useGetSettingFrontQuery } from "@/api/settingFrontApi";

const RegisterPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const domain = typeof window !== 'undefined' ? window.location.hostname : '';
  const { data: settingData } = useGetSettingFrontQuery({ domain });

  return getLocal('cookieRefreshToken') ? (
    router.push("/")
  ) : (
    <MinimalLayout pageTitle="Register">
      <Box sx={{
        height: "100vh",
        display: "flex"
      }}>
        {/* Left Side - Branding with primary color */}
        <Box sx={{
          width: { xs: "100%", md: "30%" },
          backgroundColor: theme.palette.primary.main,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pl: 10,
          pr: 10,
          justifyContent: "center",
          marginTop: 0,
        }}>
          <Typography variant="h1" sx={{ mb: 35, color: "white", textAlign: "center" }}>
            Verify, Execute, Trust
          </Typography>
          <Image
            src="/images/veritract.png"
            width={210}
            height={150}
            alt="Logo Veritract"
            style={{
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              marginBottom: 35
            }}
          />

          <Typography variant="body1" sx={{ mb: 2, color: "white", textAlign: "center " }}>
            VeriTract combines verification and legal processes to deliver
            unbreakable trust in your digital transactions.
          </Typography>
          <Typography variant="body1" sx={{ color: "white", textAlign: "center" }}>
            Our platform ensures legal documents and smart contracts are
            validated with absolute accuracy and security.
          </Typography>
        </Box>

        {/* Right Side - Register Form with default background */}
        <Box sx={{
          width: { xs: "100%", md: "70%" },
          backgroundColor: theme.palette.background.default,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4
        }}>
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              mb: 35,
              color: theme.palette.primary.main,
              fontWeight: 600
            }}
          >
            Create Account
          </Typography>
          <Card sx={{
            width: "100%",
            maxWidth: 500,
            padding: 35,
            boxShadow: 3,
            backgroundColor: theme.palette.background.paper
          }}>
            <FormRegister />

            <Typography sx={{ mt: 3, textAlign: "center" }}>
              Already have an account?
              <Link
                href="/login"
                style={{
                  textDecoration: "underline",
                  color: theme.palette.primary.main,
                  marginLeft: 4
                }}
              >
                Login
              </Link>
            </Typography>
          </Card>
        </Box>
      </Box>
    </MinimalLayout>
  );
};

export default RegisterPage;