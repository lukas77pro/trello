package pl.trello.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import pl.trello.core.Ordered;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Board implements Serializable, Ordered {

    private static final long serialVersionUID = 7483689414553387546L;
    @Id
    private String id;

    private String title;

    private List<CardList> cardLists;

    private long order;

    private String userId;
}
