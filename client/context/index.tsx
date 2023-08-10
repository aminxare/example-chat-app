import ThemeProvider from "./Theme";
import AuthProvider from "./Auth";
import ChatProvider from "./Chats";
import SocketProvider from "./Socket";
import LayoutProvider from "./Layout";

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <AuthProvider>
        <SocketProvider>
          <ThemeProvider>
            <ChatProvider>{children}</ChatProvider>
          </ThemeProvider>
        </SocketProvider>
      </AuthProvider>
    </LayoutProvider>
  );
}

export default AppProvider;
