package pl.trello;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class TrelloApplication {
    public static void main(String[] args) {
        new SpringApplicationBuilder(TrelloApplication.class).run(args);
    }
}
