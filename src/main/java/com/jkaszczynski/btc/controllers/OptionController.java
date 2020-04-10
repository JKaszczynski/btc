package com.jkaszczynski.btc.controllers;

import com.jkaszczynski.btc.dtos.OptionBasic;
import com.jkaszczynski.btc.entities.Option;
import com.jkaszczynski.btc.services.OptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OptionController {
    public OptionService optionService;

    public OptionController(OptionService optionService) {
        this.optionService = optionService;
    }

    @PostMapping("/topic/{id}/options")
    public ResponseEntity<?> addOptions(@PathVariable("id") Long topicId, @RequestBody List<OptionBasic> optionsBasics) {
        List<Option> options = optionService.addAll(topicId, optionsBasics);
        return ResponseEntity.status(HttpStatus.CREATED).body(options);
    }

    @GetMapping("/topic/{id}/options")
    public List<OptionBasic> getAllOptions(@PathVariable("id") Long topicId) {
        return optionService.getAll(topicId);
    }

    @PostMapping("/topic/{id}/vote/{optionId}")
    public ResponseEntity<?> vote(@PathVariable Long optionId) {
        OptionBasic optionBasic = optionService.vote(optionId);
        return ResponseEntity.status(HttpStatus.OK).body(optionBasic);
    }

}
