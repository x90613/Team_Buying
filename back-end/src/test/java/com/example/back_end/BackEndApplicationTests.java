// package com.example.back_end;
//
// import static org.junit.jupiter.api.Assertions.*;
//
// import java.lang.reflect.Type;
// import java.util.List;
// import java.util.concurrent.BlockingQueue;
// import java.util.concurrent.LinkedBlockingQueue;
// import java.util.concurrent.TimeUnit;
// import org.junit.jupiter.api.Test;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.messaging.converter.MappingJackson2MessageConverter;
// import org.springframework.messaging.simp.stomp.*;
// import org.springframework.web.socket.client.standard.StandardWebSocketClient;
// import org.springframework.web.socket.messaging.WebSocketStompClient;
// import org.springframework.web.socket.sockjs.client.SockJsClient;
// import org.springframework.web.socket.sockjs.client.WebSocketTransport;
//
//// websocket test
// @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
// class BackEndApplicationTests {
//
//  private final String WEBSOCKET_URI = "http://localhost:9090/websocket";
//  private final String TOPIC = "/topic/notifications/1";
//
//  @Test
//  void testWebSocketNotification() throws Exception {
//    // 建立 WebSocketStompClient
//    WebSocketStompClient stompClient =
//        new WebSocketStompClient(
//            new SockJsClient(List.of(new WebSocketTransport(new StandardWebSocketClient()))));
//    stompClient.setMessageConverter(new MappingJackson2MessageConverter());
//
//    // 建立一個阻塞隊列來接收訊息
//    BlockingQueue<String> blockingQueue = new LinkedBlockingQueue<>();
//
//    // 建立 StompSession 並連線
//    StompSession session =
//        stompClient
//            .connect(WEBSOCKET_URI, new StompSessionHandlerAdapter() {})
//            .get(5, TimeUnit.SECONDS);
//
//    // 訂閱 Topic
//    session.subscribe(
//        TOPIC,
//        new StompFrameHandler() {
//          @Override
//          public Type getPayloadType(StompHeaders headers) {
//            return String.class;
//          }
//
//          @Override
//          public void handleFrame(StompHeaders headers, Object payload) {
//            String message = (String) payload;
//            System.out.println("Received message: " + message); // 打印接收到的訊息
//            blockingQueue.add((String) payload); // 接收到訊息後添加到隊列
//          }
//        });
//
//    // 模擬發送通知
//    String testMessage = "Test notification message";
//    session.send(TOPIC, testMessage);
//
//    // 驗證是否收到訊息
//    String receivedMessage = blockingQueue.poll(5, TimeUnit.SECONDS); // 等待最多 5 秒
//    assertEquals(
//        testMessage, receivedMessage, "The received message should match the sent message.");
//  }
// }
package com.example.back_end;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackEndApplicationTests {

  @Test
  void contextLoads() {}
}
