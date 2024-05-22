import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "주류어때",
  description: "주류어때는 주류에 대한 정보를 공유하는 커뮤니티입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
