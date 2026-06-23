package com.aegis.otel.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/v1/traces")
public class OtelIngestionController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> ingestLogs(@RequestBody Map<String, Object> otelPayload) {
        // Neste ponto, o payload já passou pelo PromptInjectionFilter.
        // A lógica de persistência no PostgreSQL ocorreria aqui via Service/Repository.
        
        String traceId = UUID.randomUUID().toString();
        return ResponseEntity.ok(Map.of(
            "status", "SUCCESS",
            "message", "Log OpenTelemetry ingerido e sanitizado com sucesso.",
            "trace_id", traceId
        ));
    }
}