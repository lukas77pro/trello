package pl.trello.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.trello.core.Ordered;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Card implements Ordered {

    private String id;

    private String title;

    private String description;

    private long order;

    private List<Checklist> checklists;

    private List<Comment> comments;
}
