"use client";
import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import MinimalLayout from "@/components/layout/minimalLayout";
import FormLogin from "./_components/FormLogin";
// @ts-ignore
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getLocal } from "@/lib/helpers/cookie";
import { useTranslation } from "react-i18next";
import { useGetSettingFrontQuery } from "@/api/settingFrontApi";

const LoginPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const domain = typeof window !== 'undefined' ? window.location.hostname : '';
  const { data: settingData } = useGetSettingFrontQuery({ domain });

  return getLocal('cookieRefreshToken') ? (
    router.push("/")
  ) : (
    <MinimalLayout pageTitle="Login">
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
          // color: "white"
        }}>
          <Typography variant="h1" sx={{ mb: 35, color: "white", textAlign: "center" }}>
            Test Consulting
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
            Test
          </Typography>
          <Typography variant="body1" sx={{ color: "white", textAlign: "center" }}>
            Test
          </Typography>
        </Box>

        {/* Right Side - Login Form with default background */}
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
            {settingData?.data?.company_name ?? "Login"}
          </Typography>
          <Card sx={{
            width: "100%",
            maxWidth: 500,
            padding: 35,
            boxShadow: 3,
            backgroundColor: theme.palette.background.paper
          }}>


            <FormLogin />

            {Boolean(settingData?.data?.self_register) ? (
              <Typography sx={{ mt: 3, textAlign: "center" }}>
                {t('no_account_announcement')}
                <Link
                  href="/register"
                  style={{
                    textDecoration: "underline",
                    color: theme.palette.primary.main,
                    marginLeft: 4
                  }}
                >
                  {t('register')}
                </Link>
              </Typography>
            ) : null}
          </Card>
        </Box>
      </Box>
    </MinimalLayout>
  );
};

export default LoginPage;
