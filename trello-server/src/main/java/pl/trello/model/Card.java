package pl.trello.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.trello.core.Ordered;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Card implements Serializable, Ordered {

    private static final long serialVersionUID = -2888164557588566185L;

    @Id
    private String id;

    private String title;

    private String description;

    private long order;




    private List<Comment> comments = new ArrayList<>();
    private Checklist checklist;

}
