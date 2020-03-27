package com.jkaszczynski.btc.controllers;

import com.jkaszczynski.btc.dtos.GroupBasic;
import com.jkaszczynski.btc.entities.Group;
import com.jkaszczynski.btc.services.GroupService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GroupController {
    public GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping("/topic/{id}")
    public ResponseEntity<?> addGroup(@RequestBody GroupBasic groupBasic) {
        Group group = groupService.add(groupBasic);
        return ResponseEntity.status(HttpStatus.CREATED).body(group);
    }

    @GetMapping("/topic/{id}")
    public List<GroupBasic> getAllGroups(@PathVariable("id") Long topicId) {
        return groupService.getAll(topicId);
    }

    @PostMapping("/topic/{id}/vote/{groupId}")
    public ResponseEntity<?> vote(@PathVariable Long groupId) {
        groupService.vote(groupId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
