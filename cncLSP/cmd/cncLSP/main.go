// Pseudocode for LSP server entry point
package main

import "gcode-lsp/internal/server"

func main() {
	lspServer := server.NewGCodeServer()
	lspServer.Start()
}
