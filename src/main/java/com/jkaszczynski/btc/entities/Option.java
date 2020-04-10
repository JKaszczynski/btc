package com.jkaszczynski.btc.entities;

import lombok.Data;

import javax.persistence.*;

@Entity(name = "PollOption")
@Data
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String value;

    private Long votes;

    @ManyToOne
    private Topic topic;
}
