package com.jkaszczynski.btc.entities;

import lombok.Data;

import javax.persistence.*;

@Entity(name = "TopicGroup")
@Data
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Long votes;

    @ManyToOne
    private Topic topic;
}
