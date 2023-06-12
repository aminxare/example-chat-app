import ThemeProvider from "./Theme";
import AuthProvider from "./Auth";
import ChatProvider from "./Chats";
import SocketProvider from "./Socket";

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SocketProvider>
        <ThemeProvider>
          <ChatProvider>{children}</ChatProvider>
        </ThemeProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default AppProvider;
