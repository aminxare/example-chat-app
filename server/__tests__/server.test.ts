import { createWSServer } from "../src/init/WSServer";
import { createHttpServer } from "../src/init/httpServer";
import { configServer } from "../src/server";

describe("configServer", () => {
  it("should log an error message and exit if PORT is not set", () => {
    // Arrange
    const originalConsoleError = console.error;
    const originalProcessExit = process.exit;
    console.error = jest.fn();
    process.exit = jest.fn();

    // Act
    process.env.PORT = "";
    configServer();

    // Assert
    expect(console.error).toHaveBeenCalledWith("PORT has not setted!");
    expect(process.exit).toHaveBeenCalledWith(1);

    // Cleanup
    console.error = originalConsoleError;
    process.exit = originalProcessExit;
  });

  it("should create an HTTP server and WebSocket server", () => {
    // Arrange
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    const originalCreateHttpServer = createHttpServer;
    const originalCreateWSServer = createWSServer;
    createHttpServer = jest.fn();
    createWSServer = jest.fn();

    // Act
    process.env.PORT = "3000";
    configServer();

    // Assert
    expect(createHttpServer).toHaveBeenCalled();
    expect(createWSServer).toHaveBeenCalled();

    // Cleanup
    console.log = originalConsoleLog;
    createHttpServer = originalCreateHttpServer;
    createWSServer = originalCreateWSServer;
  });

  it("should start the server on the specified port", () => {
    // Arrange
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    const originalListen = server.listen;
    server.listen = jest.fn();

    // Act
    process.env.PORT = "3000";
    configServer();

    // Assert
    expect(server.listen).toHaveBeenCalledWith(3000);
    expect(console.log).toHaveBeenCalledWith(
      "Server is listening on port: 3000"
    );

    // Cleanup
    console.log = originalConsoleLog;
    server.listen = originalListen;
  });
});
