package pl.trello.core;

public class AlreadyExistsException extends Exception {

    private static final long serialVersionUID = 7847401423699852285L;

    public AlreadyExistsException(String message) {
        super(message);
    }
}
