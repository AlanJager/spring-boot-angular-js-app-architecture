package com.example;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = UIApplication.class)
@WebIntegrationTest("server.port:8081")
public class TokenTest {
    // require to generate JSON content from Java objects
    public static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private RestTemplate restTemplate = new RestTemplate();

    @Value("${local.server.port}")// 注入端口号
    private int port;

    @Test
    public void testTokenApi() {
//        HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

        String url = "http://localhost:" + port +"/test";
        System.out.println(url);


        try{
            Map<String, String> response = restTemplate.getForObject(url, Map.class);
        } catch (HttpClientErrorException e) {
            String responseBody = e.getResponseBodyAsString();
            String statusText = e.getStatusText();
            System.out.println(responseBody);
            System.out.println(statusText);
        }



    }
}
