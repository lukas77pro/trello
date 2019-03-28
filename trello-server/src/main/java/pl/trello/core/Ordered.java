package pl.trello.core;

public interface Ordered extends Comparable<Ordered> {

    long getOrder();

    void setOrder(long order);

    @Override
    default int compareTo(Ordered o) {
        return Long.compare(getOrder(), o.getOrder());
    }
}
