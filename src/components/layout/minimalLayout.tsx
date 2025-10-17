import { Breadcrumbs, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactNode } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTranslation } from 'react-i18next';
import { useRouter } from "next/navigation";

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface LayoutProps {
  pageTitle?: ReactNode;
  headerTitle?: ReactNode;
  children: ReactNode;
  breadcrumbMiddleItems?: BreadcrumbItem[];
  disableBreadcrumb?: boolean;
}

const MinimalLayout = ({
  pageTitle,
  headerTitle,
  children,
  breadcrumbMiddleItems,
  disableBreadcrumb = false,
}: LayoutProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const handleBreadcrumbClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    router.push(href);
  };

  const breadcrumbs = [
    <Link key={"dashboard"} underline="hover" color={theme.palette.common.white} href={"/"} onClick={(e) => handleBreadcrumbClick(e, "/")}>
      Dashboard
    </Link>,
    ...(breadcrumbMiddleItems?.map((item, i) => (
      <Link
        underline="hover"
        key={i}
        color="inherit"
        href={item.url}
        onClick={(e) => handleBreadcrumbClick(e, item.url || "")}
      >
        {item.name}
      </Link>
    )) ?? []),
    headerTitle && (
      <Typography
        key={headerTitle.toString() ?? "default"}
        variant="body1"
        color="textPrimary"
        sx={{
          color: theme.palette.common.white,
          cursor: "default",
          "&:hover": {
            textDecoration: "none",
          },
        }}
      >
        {headerTitle}
      </Typography>
    ),
  ];

  return (
    <div>
      <div>
        <title>{`${t('appName')} | ${pageTitle ?? "..Loading"}`}</title>
      </div>
      {headerTitle && (
        <Card sx={{ marginBottom: 20, marginTop: 30, backgroundColor: theme.palette.primary.main }}>
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid>
                <Typography variant="h3" component="div" sx={{ color: theme.palette.common.white }}>
                  {headerTitle}
                </Typography>
              </Grid>
              {!disableBreadcrumb && (
                <Grid>
                  <Breadcrumbs separator={<NavigateNextIcon fontSize="small" sx={{ color: theme.palette.common.white }} />} aria-label="breadcrumb">
                    {breadcrumbs}
                  </Breadcrumbs>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )}
      {children}
    </div>
  );
};

export default MinimalLayout;