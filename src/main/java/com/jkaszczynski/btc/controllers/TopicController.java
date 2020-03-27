package com.jkaszczynski.btc.controllers;

import com.jkaszczynski.btc.dtos.TopicBasic;
import com.jkaszczynski.btc.entities.Topic;
import com.jkaszczynski.btc.services.TopicService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TopicController {

    public TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @PostMapping
    @RequestMapping("/topic")
    public ResponseEntity<?> addTopic(@RequestBody TopicBasic topicBasic) {
        Topic topic = topicService.add(topicBasic.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(topic);
    }
}
