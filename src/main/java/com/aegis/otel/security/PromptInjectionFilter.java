package com.aegis.otel.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.regex.Pattern;

@Component
public class PromptInjectionFilter extends OncePerRequestFilter {

    private static final Pattern JAILBREAK_PATTERN = Pattern.compile("(?i)(ignore previous instructions|system prompt|bypass|disregard|you are now|act as)");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper(request);
        
        // Permite a leitura do body para análise sem consumir o InputStream original
        filterChain.doFilter(wrappedRequest, response);
        
        byte[] buf = wrappedRequest.getContentAsByteArray();
        if (buf.length > 0) {
            String payload = new String(buf, 0, buf.length, StandardCharsets.UTF_8);
            int riskScore = calculateRisk(payload);
            
            if (riskScore > 75) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"Acesso Negado\", \"reason\": \"Possível Prompt Injection detectado\", \"risk_score\": " + riskScore + "}");
                return;
            }
        }
    }

    private int calculateRisk(String payload) {
        int score = 0;
        if (JAILBREAK_PATTERN.matcher(payload).find()) score += 80;
        if (payload.length() > 5000) score += 20;
        return Math.min(score, 100);
    }
}