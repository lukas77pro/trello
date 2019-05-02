package pl.trello.core;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserData implements Serializable {

    private static final long serialVersionUID = 5549848363318002851L;

    private String username;

    private String email;

    private String password;
}
