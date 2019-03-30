package pl.trello.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.trello.core.Ordered;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Card implements Serializable, Ordered {

    private static final long serialVersionUID = -2888164557588566185L;

    private String title;

    private String description;

    private long order;
}
