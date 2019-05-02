package pl.trello.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Team implements Serializable {

    private static final long serialVersionUID = 5636283926271129820L;
    @Id
    private String id;

    private String name;
    @DBRef
    private User creator;
    @DBRef
    private List<User> members;
    @DBRef
    private List<User> invitedUsers;
}
